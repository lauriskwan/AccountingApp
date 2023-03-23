import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { PhotographIcon } from "@heroicons/react/outline";

export default function Collapse({
  toggleButtonOne,
  toggleButtonTwo,
  toggleButtonThree,
  toggleButtonFour,
  toggleButtonFive,
  toggleButtonSix,
}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion
        open={open === 1}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              open ? "rotate-180" : ""
            } h-5 w-5 transition-transform absolute right-6`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => handleOpen(1)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        }
        className="border-none"
      >
        <AccordionHeader
          className="border-none relative"
          children={""}
        ></AccordionHeader>
        <AccordionBody>
          <div className="flex items-center">
            <p className="px-4">Enter Amount: </p>
            <p className="ml-auto mr-1">$</p>
            <input
              type="number"
              step="0.01"
              className="w-[225px] border border-gray-200 rounded-md pl-2"
            />
          </div>
          <div className="mt-3 space-y-3 flex flex-col items-center">
            <div className="space-x-2">
              <Button onClick={toggleButtonOne} color="blue">
                Button 1
              </Button>
              <Button onClick={toggleButtonTwo} color="red">
                Button 2
              </Button>
              <Button onClick={toggleButtonThree} color="amber">
                Button 3
              </Button>
            </div>
            <div className="space-x-2">
              <Button onClick={toggleButtonFour} color="amber">
                Button 4
              </Button>
              <Button onClick={toggleButtonFive} color="red">
                Button 5
              </Button>
              <Button onClick={toggleButtonSix} color="blue">
                Button 6
              </Button>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}
