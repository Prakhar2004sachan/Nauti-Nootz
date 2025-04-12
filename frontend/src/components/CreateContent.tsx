import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import InputComponent from "./InputComponent";
import { useOutsideClick } from "../utils/useOutsideClick";

function CreateContent({
  open,
  close,
}: {
  open: boolean;
  close: VoidFunction;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, close);
  return (
    <div>
      {open && (
        <div className="w-full h-[100vh] bg-black opacity-95 fixed top-0 left-0 inset-0 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white flex flex-col px-8 py-4 rounded-xl sm:min-w-[20rem] lg:min-w-[30rem]"
          >
            <div className="flex mb-4 justify-between items-center">
              <h3 className="font-semibold text-2xl">Add content</h3>
              <RxCross2 className="size-6 cursor-pointer" onClick={close} />
            </div>
            <InputComponent />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateContent;
