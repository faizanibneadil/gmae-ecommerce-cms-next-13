"use client";

import {
  Button,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  TextInput,
} from "@tremor/react";
import { Trash } from "lucide-react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

export default function ImagesForm({ images, actions }: any) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://drive.google.com/uc?id=${src}`;
  };
  return (
    <div>
      <List className="mt-4">
        {images.map((image: any, idx: number) => (
          <ListItem key={image.id}>
            <Flex justifyContent="start" className="space-x-4 truncate">
              {image.src ? (
                <Image
                  priority
                  loader={imageLoader}
                  className="w-10 h-10 rounded-full"
                  width={30}
                  height={30}
                  alt=""
                  src={image.src}
                  loading="lazy"
                />
              ) : (
                <TextInput
                  onChange={(e) =>
                    actions.replace(idx, {
                      id: Date.now(),
                      src: e.target.value,
                    })
                  }
                  placeholder="add image id you copied from google drive ..."
                />
              )}
              <div className="truncate">
                <Text className="truncate">Image: {idx + 1}</Text>
              </div>
            </Flex>
            <Text>
              <Button
                type="button"
                variant="secondary"
                className="p-0 m-0"
                onClick={() => actions.remove(idx)}
              >
                <Icon icon={Trash} variant="outlined" tooltip="Delete" />
              </Button>
            </Text>
          </ListItem>
        ))}
      </List>
      {images.length <= 4 && (
        <Button
          icon={UploadCloud}
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => actions.push({ id: Date.now(), src: "" })}
        >
          Add Image
        </Button>
      )}
    </div>
  );
}
