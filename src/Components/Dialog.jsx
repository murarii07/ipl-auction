import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function DialogBox({ open, functionHandle, title, description, info, cancelFunction }) {
  let [isOpen, setIsOpen] = useState(open)
  useEffect(() => {
    setIsOpen(open)
  }, [open])
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog static open={isOpen}  onClose={() => setIsOpen(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4  ">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-neutral-900 p-12 rounded-xl"
              >
                <DialogTitle className="text-lg font-bold text-white">{title}</DialogTitle>
                <Description className={"text-white"}>{description}</Description>
                <p className='text-white'>{info}</p>
                <div className="flex gap-4">
                  <button onClick={() => {
                    functionHandle()
                    setIsOpen(false)
                  }
                  } className='p-2  bg-green-500 text-white rounded-md'>Confirm</button>
                  <button onClick={() => {
                    cancelFunction();
                    setIsOpen(false);
                  }} className='p-2 rounded-md bg-red-400 text-white' >Cancel</button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
export default DialogBox;