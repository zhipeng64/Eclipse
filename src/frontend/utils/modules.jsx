import { useEffect } from "react";

/**
 * useCloseOnClickOutside
 *
 * Sets up an event listener that triggers a callback when a mouse click
 * occurs outside the referenced DOM element. Useful for dismissing modals,
 * dropdowns, or popovers.
 *
 * @param {object} ref - A React ref pointing to the DOM element to monitor.
 * @param {boolean} isActive - Whether the event listener should be active (e.g., modal is open).
 * @param {function} onClose - Function to invoke when a click occurs outside the element.
 */
function useCloseOnClickOutside(ref, isActive, onClose) {
  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;
      const targetElement = ref.current;

      if (
        targetElement &&
        clickedElement !== targetElement &&
        !targetElement.contains(clickedElement)
      ) {
        onClose?.(event);
      }
    };

    if (isActive && ref.current) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isActive, onClose]);
}

export { useCloseOnClickOutside };
