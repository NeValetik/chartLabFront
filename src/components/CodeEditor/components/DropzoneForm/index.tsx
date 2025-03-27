import FileInput from "@/components/Form/FileInput";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const DropzoneForm = () => {

  return (
    <Menu>
      <MenuButton
        className="
          rounded 
          transition-colors
          flex justify-center items-center 
          cursor-pointer
          gap-1
          data-[hover]:bg-monokai-yellow
          data-[hover]:data-[active]:bg-monokai-green
          bg-monokai-gray-700
          text-monokai-gray-500
          data-[hover]:text-monokai-gray-1000
          py-2 px-4 
          font-bold
        "
      >
        Templates
      </MenuButton>
      <MenuItems 
        anchor="bottom start"
        className="
          bg-gray-300 p-3
          rounded divide-y-2 divide-gray-400
        "
      >
        <MenuItem 
          as="div"
        >
          <FileInput />
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}