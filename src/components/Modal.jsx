import { createPortal } from "react-dom"
import { useImperativeHandle, forwardRef, useRef } from "react";
import Button from "./Button";

export const Modal = forwardRef(({ buttonCaption, children }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        }
    }))

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method='dialog' className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
}
)