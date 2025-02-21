import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

const ImageZoomDialog = ({ imageUrl }: { imageUrl: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <Image
          src={imageUrl}
          alt="Zoomable Image"
          width={200}
          height={200}
          className="cursor-pointer w-full"
        />
      </Dialog.Trigger>


      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[199] bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex justify-center items-center z-[199] h-full">
          <div className="bg-white p-4 rounded-lg h-full flex justify-center items-center relative w-full">

            <Dialog.Trigger asChild className="absolute top-3 right-3 z-[199]">
              <RxCross1 size={30} className="cursor-pointer text-black" />
            </Dialog.Trigger>


            <TransformWrapper
              pinch={{ disabled: false }}
              doubleClick={{ disabled: false }}
              panning={{ disabled: false }}
              zoomAnimation={{ animationTime: 300, animationType: "easeOut" }}
              initialScale={1}
              minScale={1}
              maxScale={3}
              limitToBounds={true}
            >
              <TransformComponent>
                <Image
                  src={imageUrl}
                  alt="Zoomed Image"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageZoomDialog;
