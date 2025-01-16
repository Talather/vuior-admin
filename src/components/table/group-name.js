import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function GroupNameModalComponent({ isOpen, onClose, onSubmit, setItem }) {
  const { formState: { errors }, handleSubmit, register } = useForm();

  const handleClose = () => {
    if (setItem) setItem(null);
    onClose();
  };

  return (
    <Modal radius={'sm'} size={'sm'} isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Download Group Average Report</ModalHeader>
              <ModalBody>
                <Input defaultValue={''} errorMessage={!!errors.groupName && 'Please provide the Group Name'}
                  isInvalid={!!errors.groupName} label={'Group Name'}
                  labelPlacement={'outside'} {...register('groupName', { required: true })} radius={'sm'} type={'text'}
                  variant={'bordered'} />
              </ModalBody>
              <ModalFooter>
                <Button color={'default'} variant="light" onPress={handleClose}>
                  Cancel
                </Button>
                <Button color={'success'} type={'submit'}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
}