"use client";

import { useEffect } from "react";

const HOME_SECTION_SELECTOR = "[data-scroll-section]";

function elasticEase(progress: number) {
  const smooth =
    progress < 0.5
      ? 4 * progress ** 3
      : 1 - (-2 * progress + 2) ** 3 / 2;
  const tail = Math.max((progress - 0.78) / 0.22, 0);
  const bounce = Math.sin(tail * Math.PI * 2.5) * (1 - tail) * 0.018;

  return smooth + bounce;
}

function hasScrollableParent(target: EventTarget | null, delta: number) {
  let element = target instanceof Element ? target : null;

  while (element && element !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(element);
    const isScrollable = /(auto|scroll)/.test(overflowY);

    if (isScrollable && element.scrollHeight > element.clientHeight) {
      const canScrollDown =
        element.scrollTop + element.clientHeight < element.scrollHeight - 1;
      const canScrollUp = element.scrollTop > 0;

      if ((delta > 0 && canScrollDown) || (delta < 0 && canScrollUp)) {
        return true;
      }
    }

    element = element.parentElement;
  }

  return false;
}

export function ElasticScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let current = window.scrollY;
    let target = current;
    let velocity = 0;
    let animationFrame = 0;
    let previousTime = performance.now();

    const maximumScroll = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    const scrollToSection = (destination: number) => {
      const origin = window.scrollY;
      const distance = destination - origin;
      const duration = 1700;
      const startTime = performance.now();

      const animateSection = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        window.scrollTo({
          top: origin + distance * elasticEase(progress),
          behavior: "auto",
        });

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animateSection);
          return;
        }

        current = destination;
        target = destination;
        velocity = 0;
        animationFrame = 0;
        window.scrollTo({ top: destination, behavior: "auto" });
      };

      animationFrame = window.requestAnimationFrame(animateSection);
    };

    const animate = (time: number) => {
      const frameTime = Math.min(Math.max((time - previousTime) / 16.67, 0.5), 2);
      previousTime = time;
      target = Math.min(Math.max(target, 0), maximumScroll());

      const distance = target - current;
      velocity += distance * 0.055 * frameTime;
      velocity *= Math.pow(0.78, frameTime);
      current += velocity * frameTime;

      if (current <= 0 || current >= maximumScroll()) {
        current = Math.min(Math.max(current, 0), maximumScroll());
        velocity *= 0.35;
      }

      window.scrollTo({ top: current, behavior: "auto" });

      if (Math.abs(distance) < 0.5 && Math.abs(velocity) < 0.5) {
        current = target;
        velocity = 0;
        animationFrame = 0;
        window.scrollTo({ top: current, behavior: "auto" });
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        hasScrollableParent(event.target, event.deltaY)
      ) {
        return;
      }

      event.preventDefault();

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(HOME_SECTION_SELECTOR)
      );

      if (sections.length > 1) {
        if (animationFrame) return;

        const currentScroll = window.scrollY;
        const currentIndex = sections.reduce((closestIndex, section, index) => {
          const closestDistance = Math.abs(
            sections[closestIndex].offsetTop - currentScroll
          );
          const sectionDistance = Math.abs(section.offsetTop - currentScroll);

          return sectionDistance < closestDistance ? index : closestIndex;
        }, 0);
        const direction = event.deltaY > 0 ? 1 : -1;
        const nextIndex = Math.min(
          Math.max(currentIndex + direction, 0),
          sections.length - 1
        );

        if (nextIndex !== currentIndex) {
          scrollToSection(sections[nextIndex].offsetTop);
        }

        return;
      }

      if (!animationFrame) {
        current = window.scrollY;
        target = current;
        velocity = 0;
        previousTime = performance.now();
      }

      let impulse = event.deltaY;

      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        impulse *= 16;
      } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        impulse *= window.innerHeight;
      } else if (Math.abs(impulse) >= 40) {
        impulse *= 2.2;
      }

      target = Math.min(Math.max(target + impulse, 0), maximumScroll());

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
