// Contains reusable, custom React hooks.
// Custom hooks are functions that integrate with React's state and lifecycle mechanisms, unlike
// plain utility functions
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

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

/**
 * useAuthenticationChecks
 *
 * Performs a request to the backend for user authentication status
 * to render UI pages for better UX.
 */
function useAuthenticationChecks() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Context can be referenced inside custom React hooks
  const checkAuth = useContext(AuthContext);
  // Sets user authentication status
  useEffect(() => {
    const authHandler = async () => {
      const authStatus = await checkAuth();
      console.log("auth status: ", authStatus);
      setIsAuthenticated(authStatus);
      setIsLoading(false);

      if (!authStatus) {
        navigate("/");
      }
    };
    authHandler();
  }, [checkAuth, navigate]);

  // Being a custom hook, it can return Reactive values
  return {
    isLoading,
    isAuthenticated,
  };
}

/**
 * Utility functions for array manipulation in state updates
 * These are NOT hooks - they're utility functions to be used inside state setters
 */
const insertIfNotExists = (
  prevArray,
  elementsToInsert,
  comparator = (a, b) => a === b
) => {
  const filteredElements = elementsToInsert.filter((newElement) => {
    return !prevArray.some((existingElement) =>
      comparator(existingElement, newElement)
    );
  });
  return [...prevArray, ...filteredElements];
};

const removeIfExists = (
  prevArray,
  elementsToRemove,
  comparator = (a, b) => a === b
) => {
  return prevArray.filter((existingElement) => {
    return !elementsToRemove.some((elementToRemove) =>
      comparator(existingElement, elementToRemove)
    );
  });
};

export {
  useCloseOnClickOutside,
  useAuthenticationChecks,
  insertIfNotExists,
  removeIfExists,
};
