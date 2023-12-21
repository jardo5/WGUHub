function ConfirmModal({ title, description, onConfirm, onCancel }) {
    return (
        <dialog className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box bg-accent">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{description}</p>
                <div className="modal-action">
                    <button className="btn" onClick={onConfirm}>Confirm</button>
                    <button className="btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
}

export default ConfirmModal;