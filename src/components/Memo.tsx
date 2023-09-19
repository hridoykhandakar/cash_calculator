import { ReactNode } from "react";
import { usePDF, Margin } from "react-to-pdf";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Memo: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const { toPDF, targetRef } = usePDF({
    filename: "page.pdf",
    method: "open",
    page: {
      format: "letter",
      margin: Margin.LARGE,
    },
  });
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white  mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div
          ref={targetRef}
          className="modal-content py-4 text-left w-full px-6"
        >
          {children}
        </div>
        <div className="modal-footer  py-4 px-6 flex justify-between">
          <button
            className="modal-close px-4 py-2 bg-red-600 text-white rounded-lg "
            onClick={onClose}
          >
            ✖
          </button>
          <button onClick={() => toPDF()} className="btn bg-pink-600">
            সংরক্ষণ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
export default Memo;
