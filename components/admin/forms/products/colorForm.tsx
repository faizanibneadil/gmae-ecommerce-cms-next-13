"use client";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import * as Form from "@radix-ui/react-form";

export default function ColorForm() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="gap-2 btn" aria-label="Add Color">
          <PlusIcon className="w-5 h-5" /> Add Color
        </button>
      </Popover.Trigger>
      <Popover.Portal className="z-50">
        <Popover.Content
          className="rounded p-5 w-[260px] bg-base-300 shadow z-50 will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
              Choose New Color
            </p>
            <Form.Root
              onSubmit={(event) => {
                event.preventDefault();
                const data = Object.fromEntries(
                  new FormData(event.currentTarget)
                );
                console.log(data);
              }}
            >
              <Form.Field name="color" className="flex items-center gap-5">
                <Form.Label
                  className="text-[13px] text-violet11 w-[75px]"
                  htmlFor="width"
                >
                  Color
                </Form.Label>
                <Form.Control
                  className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                  id="width"
                  type="color"
                />
              </Form.Field>
              <Form.Submit>
                <button className="btn btn-block">Save</button>
              </Form.Submit>
            </Form.Root>
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
