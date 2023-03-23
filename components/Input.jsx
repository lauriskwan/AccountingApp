import { db, storage } from "@/firebase";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import BSButton from "./BSButton";
import Collapse from "./Collapse";
import PnLButton from "./PnLButton";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null); // initial value is null

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      // get database
      id: session.user.uid, // custom session using callbacks
      userEmail: session.user.email,
      text: input,
      userImg: session.user.image,
      name: session.user.name,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`); // ref() is a firebase storage's built-in method; second parameter is upload path

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url") // upload to where, what to upload, which method
        .then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            // updateDoc built-in method; 5:44:00; if there is an image, add the image url to the post inside firestore
            image: downloadURL,
          });
        });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader(); // built-in JS function
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3 relative">
          <img
            src={session?.user?.image}
            alt=""
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            onClick={signOut}
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="h-7 text-black absolute cursor-pointer bg-white hover:bg-gray-100 rounded-full top-2 right-2"
                />
                <img
                  src={selectedFile}
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="relative">
              <div className="flex items-center absolute z-10 top-2">
                <div
                  className="pl-2"
                  onClick={() => filePickerRef.current.click()}
                >
                  <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                  {/* ref can be used after importing useRef hook from react, to connect the icon to input */}
                </div>
              </div>
              <Collapse />
            </div>
            {/*  */}
            {/* <div className="space-y-3 w-full border-none">
              <div className="mt-3 flex items-center">
                <p className="px-4">Enter Amount: </p>
                <p className="ml-auto mr-1">$</p>
                <input
                  type="number"
                  step="0.01"
                  className="w-[225px] border border-gray-200 rounded-md pl-2"
                />
              </div>
              <div className="flex items-center justify-between">
                <PnLButton />
                <BSButton />
              </div>
            </div> */}
            {/*  */}
            <div className="flex border-none justify-end mt-3">
              <button
                onClick={sendPost}
                disabled={(!input.trim() && !selectedFile) || loading}
                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
