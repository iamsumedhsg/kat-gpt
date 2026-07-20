import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>Hale hula haha
      <ModeToggle/>
      <UserButton/>
    </div>

  );
}
