import React from "react";

// ConfirmationModal is a popup that asks the user to confirm or cancel an action
export default function ConfirmationModal({
  open,      // controls if the modal is visible
  onClose,   // function that runs when Cancel is clicked
  onConfirm, // function that runs when Confirm is clicked
  message,   // text shown inside the modal
}) {
  // If modal is not open, return nothing
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          minWidth: 320,
        }}
      >
        <p>{message}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
