import {Modal, ModalBody, ModalHeader} from "@/app/components/modal";
import {RoundedTinyButton} from "@/app/components/ui/rounded-tiny-button.tsx";
import {IoCloseOutline} from "react-icons/io5";
import {Button, Label} from "@/app/components/ui";
import {Spinner} from "@/app/components/ui/spinner.tsx";
import {UserInterface} from "@/app/pages/auth/hooks/useLogin.ts";
import {Controller, useForm} from "react-hook-form";
import {TotpForm} from "@/app/pages/auth/schema/totp.schema.ts";
import {InputTOTP} from "@/app/components/ui/totp-input-masked.tsx";
import {useTranslation} from "react-i18next";

interface twoFa{
    user: UserInterface
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (data: TotpForm)=> void,
    isLoading: boolean
}

export const TwoFactorModal = ({
                                           isOpen,
                                           onClose,
                                           onSubmit,
                                           user,
                                           isLoading
                                       }: twoFa) => {
    const totpForm = useForm({
        mode: 'onChange',
        defaultValues: {
            code: '',
            backupCodeInstead: false
        }
    });
    const { t } = useTranslation();

    const handleSubmit = (data: TotpForm) => {
        onSubmit(data);
        totpForm.reset();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalHeader>
                {user?.username ? (
                    <div className="flex gap-3 items-center">
                        <img
                            className="rounded-full w-10 h-10 ring-1 ring-blue-400 p-1"
                            alt="user"
                            src={user.urlImage || '/new-ccc-isolated-logo.svg'}
                        />
                        <div>
                            <h2 className="font-semibold capitalize">
                                {user.fullName}
                            </h2>
                            <p className="text-sm text-zinc-700 dark:text-gray-200 capitalize">
                                {'@' + user.username}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="font-semibold">Confirm your identification</p>
                )}

                <RoundedTinyButton onClick={onClose}>
                    <IoCloseOutline />
                </RoundedTinyButton>
            </ModalHeader>

            <form onSubmit={totpForm.handleSubmit(handleSubmit)}>
                <ModalBody className="space-y-2">
                    <Label>
                        <Label>{totpForm.watch('backupCodeInstead')
                            ? t('login.insertBackupCode')
                            : t('login.insertTotpCode')}</Label>
                    </Label>

                    <div className="flex items-center gap-2 mt-1">
                        <Controller
                            name="code"
                            control={totpForm.control}
                            render={({ field }) => (
                                <InputTOTP
                                    forBackupCode={totpForm.watch('backupCodeInstead')}
                                    {...field}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={!totpForm.formState.isValid}
                            variant="primary"
                        >
                            <Spinner hidden={!isLoading} />
                            {t('defaults.accept')}
                        </Button>
                    </div>

                    <div className="flex gap-1">
                        <input
                            type="checkbox"
                            {...totpForm.register('backupCodeInstead')}
                        />
                        <p className="text-gray-500 dark:text-gray-50">
                            {t('login.backupCodeInstead')}
                        </p>
                    </div>
                </ModalBody>
            </form>
        </Modal>
    );
}

