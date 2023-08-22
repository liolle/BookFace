import React, { useState, useEffect, useRef, FC } from "react";

const TextInputModal= () => {
    const modalRef = useRef<HTMLDialogElement>();
    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <dialog className="modal bg-[#f4f4f450]"  >
            <form method="dialog" className="modal-box bg-neutral-100">

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
            </form>
        </dialog>
    )
};

export default TextInputModal;

