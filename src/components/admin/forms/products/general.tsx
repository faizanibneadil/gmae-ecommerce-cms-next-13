"use client";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import * as Form from "@radix-ui/react-form";

export default function GeneralForm() {
  return (
    <Form.Root
      className="space-y-4 "
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        console.log(data);
      }}
    >
      
      <Form.Field name="image" className="flex flex-col">
        <div className="flex flex-col self-center">
          <label htmlFor="image" className="btn btn-circle btn-lg">
            <ArrowUpTrayIcon className="w-6 h-6" />
          </label>
          <Form.Message
            className="self-center mt-2 text-center label-text-alt text-error"
            match="valueMissing"
          >
            Product Image is Required.
          </Form.Message>
        </div>
        <Form.Control id="image" type="file" className="hidden" required />
      </Form.Field>
      <Form.Field name="title" className="w-full form-control">
        <label className="label">
          <Form.Label className="label-text"></Form.Label>
          <Form.Message
            className="label-text-alt text-error"
            match="valueMissing"
          >
            Product Title is Required.
          </Form.Message>
          <Form.Message
            className="label-text-alt text-error"
            match={(value) => value.length > 120}
          >
            Only 120 characters is allowed.
          </Form.Message>
        </label>
        <Form.Control
          autoComplete="off"
          required
          placeholder="Product Name - Ex: Samsung Galaxy 8"
          className="w-full input input-ghost input-sm"
          type="text"
        />
      </Form.Field>
      <Form.Field name="description" className="w-full form-control">
        <label className="label">
          <Form.Label className="label-text"></Form.Label>
          <Form.Message
            className="label-text-alt text-error"
            match="valueMissing"
          >
            Product Description is Required.
          </Form.Message>
          <Form.Message
            className="label-text-alt text-error"
            match={(value) => value.length > 300}
          >
            Only 300 characters is allowed.
          </Form.Message>
        </label>
        <Form.Control asChild>
          <textarea
            required
            className="w-full textarea textarea-ghost"
            rows={8}
            placeholder="Product Description - Ex: Samsung Galaxy 8 is a new brand phone. bla bla ..."
          ></textarea>
        </Form.Control>
      </Form.Field>
      <Form.Submit type="submit" className="mt-10 btn">
        Save
      </Form.Submit>
    </Form.Root>
  );
}
