import { test, expect, devices } from '@playwright/test';

const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 900;
const { defaultBrowserType: _unusedBrowser, ...IPHONE_13 } = devices['iPhone 13'];

function getLockMetrics() {
  const section = document.querySelector('#case-studies');
  const sticky = document.querySelector('.case-study-lock__sticky');
  const nextSection = document.querySelector('#next-steps');
  const activeDot = document.querySelectorAll('.case-study-lock__dot');
  const activeIndex = [...activeDot].findIndex((dot) => dot.classList.contains('is-active'));
  const rect = section?.getBoundingClientRect();
  const stickyRect = sticky?.getBoundingClientRect();
  const nextRect = nextSection?.getBoundingClientRect();
  const headerHeight =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;

  return {
    scrollY: window.scrollY,
    lockState: section?.dataset.lockState ?? null,
    activeIndex,
    rectTop: rect?.top ?? null,
    rectBottom: rect?.bottom ?? null,
    stickyTop: stickyRect?.top ?? null,
    stickyBottom: stickyRect?.bottom ?? null,
    nextTop: nextRect?.top ?? null,
    viewportHeight: window.innerHeight,
    headerHeight,
  };
}

async function readLockMetrics(page) {
  return page.evaluate(getLockMetrics);
}

async function humanWheel(page, deltas) {
  for (const delta of deltas) {
    await page.mouse.wheel(0, delta);
    await page.waitForTimeout(110);
  }
}

async function repeatUntil(page, action, predicate, attempts = 8) {
  for (let index = 0; index < attempts; index += 1) {
    await action();
    if (await predicate()) {
      return true;
    }
  }

  return false;
}

async function swipe(page, { startX, startY, endX, endY, steps = 12 }) {
  const client = await page.context().newCDPSession(page);
  const points = Array.from({ length: steps }, (_, index) => {
    const progress = index / (steps - 1);
    return {
      x: startX + (endX - startX) * progress,
      y: startY + (endY - startY) * progress,
    };
  });

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: points[0].x, y: points[0].y }],
  });

  for (const point of points.slice(1)) {
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: point.x, y: point.y }],
    });
    await page.waitForTimeout(22);
  }

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });

  await page.waitForTimeout(180);
}

async function findCaseStudies(page) {
  await page.waitForSelector('#case-studies');
  return page.locator('#case-studies');
}

function isActiveCarouselState(metrics) {
  return metrics.lockState === 'sliding' || metrics.lockState === 'hold';
}

function isPinnedBelowHeader(metrics) {
  return (
    typeof metrics.stickyTop === 'number' &&
    typeof metrics.headerHeight === 'number' &&
    Math.abs(metrics.stickyTop - metrics.headerHeight) <= 6
  );
}

async function positionBeforeCaseStudies(page, offset) {
  await page.waitForSelector('#case-studies');
  await page.evaluate((scrollOffset) => {
    const section = document.querySelector('#case-studies');
    if (!section) {
      return;
    }

    const top = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo(0, Math.max(0, top - scrollOffset));
  }, offset);
  await page.waitForTimeout(260);
}

test.describe('Case study lock', () => {
  test('desktop locks and unlocks when scrolling down and back up', async ({ page }) => {
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    await page.goto('http://127.0.0.1:4176/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    await findCaseStudies(page);
    await positionBeforeCaseStudies(page, 280);

    const lockedSection = await repeatUntil(
      page,
      () => humanWheel(page, [220]),
      () =>
        readLockMetrics(page).then(
          (m) => isActiveCarouselState(m) && isPinnedBelowHeader(m) && m.activeIndex >= 0,
        ),
      6,
    );
    expect(lockedSection).toBe(true);

    const lockedStart = await readLockMetrics(page);
    const reachedMiddleCard = await repeatUntil(
      page,
      () => humanWheel(page, [220]),
      () => readLockMetrics(page).then((m) => m.activeIndex >= 1),
      6,
    );
    expect(reachedMiddleCard).toBe(true);

    const lockedMid = await readLockMetrics(page);
    expect(isActiveCarouselState(lockedMid)).toBe(true);
    expect(isPinnedBelowHeader(lockedStart)).toBe(true);
    expect(isPinnedBelowHeader(lockedMid)).toBe(true);
    expect(lockedMid.activeIndex).toBeGreaterThanOrEqual(1);

    const reachedFinalCard = await repeatUntil(
      page,
      () => humanWheel(page, [220]),
      () => readLockMetrics(page).then((m) => m.activeIndex === 2),
      8,
    );
    expect(reachedFinalCard).toBe(true);

    const releasedAfterFinal = await repeatUntil(
      page,
      () => humanWheel(page, [220]),
      () =>
        readLockMetrics(page).then(
          (m) => m.lockState === 'after' && typeof m.nextTop === 'number' && m.nextTop < m.viewportHeight,
        ),
      8,
    );
    expect(releasedAfterFinal).toBe(true);

    await humanWheel(page, [220, 220]);
    const afterRelease = await readLockMetrics(page);
    expect(afterRelease.stickyTop).toBeLessThan(afterRelease.headerHeight - 20);

    const relockedSection = await repeatUntil(
      page,
      () => humanWheel(page, [-240]),
      () =>
        readLockMetrics(page).then(
          (m) => isActiveCarouselState(m) && isPinnedBelowHeader(m),
        ),
      10,
    );
    expect(relockedSection).toBe(true);

    const movedBackThroughCards = await repeatUntil(
      page,
      () => humanWheel(page, [-220]),
      () => readLockMetrics(page).then((m) => m.activeIndex <= 1),
      8,
    );
    expect(movedBackThroughCards).toBe(true);
  });

  test.describe('mobile', () => {
    test.use(IPHONE_13);

    test('mobile locks and unlocks when swiping down and back up', async ({ page }) => {
      await page.goto('http://127.0.0.1:4176/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      await findCaseStudies(page);
      await positionBeforeCaseStudies(page, 160);

      const lockedSection = await repeatUntil(
        page,
        () => swipe(page, { startX: 195, startY: 700, endX: 195, endY: 430 }),
        () =>
          readLockMetrics(page).then(
            (m) => isActiveCarouselState(m) && isPinnedBelowHeader(m),
          ),
        6,
      );
      expect(lockedSection).toBe(true);

      const reachedMiddleCard = await repeatUntil(
        page,
        () => swipe(page, { startX: 195, startY: 700, endX: 195, endY: 430 }),
        () => readLockMetrics(page).then((m) => m.activeIndex >= 1),
        6,
      );
      expect(reachedMiddleCard).toBe(true);

      const lockedMid = await readLockMetrics(page);
      expect(isPinnedBelowHeader(lockedMid)).toBe(true);
      expect(lockedMid.activeIndex).toBeGreaterThanOrEqual(1);

      const reachedFinalCard = await repeatUntil(
        page,
        () => swipe(page, { startX: 195, startY: 700, endX: 195, endY: 430 }),
        () => readLockMetrics(page).then((m) => m.activeIndex === 2),
        8,
      );
      expect(reachedFinalCard).toBe(true);

      const releasedAfterFinal = await repeatUntil(
        page,
        () => swipe(page, { startX: 195, startY: 700, endX: 195, endY: 410 }),
        () =>
          readLockMetrics(page).then(
            (m) => m.lockState === 'after' && typeof m.nextTop === 'number' && m.nextTop < m.viewportHeight,
          ),
        8,
      );
      expect(releasedAfterFinal).toBe(true);

      await swipe(page, { startX: 195, startY: 700, endX: 195, endY: 410 });
      const afterRelease = await readLockMetrics(page);
      expect(afterRelease.stickyTop).toBeLessThan(afterRelease.headerHeight - 20);

      const relockedSection = await repeatUntil(
        page,
        () => swipe(page, { startX: 195, startY: 280, endX: 195, endY: 660 }),
        () =>
          readLockMetrics(page).then(
            (m) => isActiveCarouselState(m) && isPinnedBelowHeader(m),
          ),
        10,
      );
      expect(relockedSection).toBe(true);

      const movedBackThroughCards = await repeatUntil(
        page,
        () => swipe(page, { startX: 195, startY: 280, endX: 195, endY: 660 }),
        () => readLockMetrics(page).then((m) => m.activeIndex <= 1),
        8,
      );
      expect(movedBackThroughCards).toBe(true);
    });
  });
});
