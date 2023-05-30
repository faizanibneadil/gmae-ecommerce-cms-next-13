"use client";

import { FunnelIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";

export default function CategoriesHeader() {
  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <input
              type="text"
              placeholder="Search hare ..."
              className="w-full input input-ghost"
            />
          </form>
        </div>
        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button type="button" className="gap-2 btn">
                <PlusIcon className="w-5 h-5" />
                Add Category
              </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="drawer-overlay data-[state=open]:animate-overlayShow fixed inset-0" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-base-300 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Form.Root
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = Object.fromEntries(
                      new FormData(event.currentTarget)
                    );
                    console.log(data);
                  }}
                >
                  <Form.Field name="image">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </Form.Field>
                  <AlertDialog.Description className="m-2">
                    <Form.Field name="name" asChild>
                      <textarea
                        className="w-full textarea textarea-ghost"
                        placeholder="Category Name Ex: Samsung"
                        rows={4}
                      ></textarea>
                    </Form.Field>
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4 p-4">
                    <AlertDialog.Cancel asChild>
                      <button className="btn btn-warning">Cancel</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button className="btn" type="submit">Save</button>
                    </AlertDialog.Action>
                  </div>
                </Form.Root>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </div>
    </div>
  );
}