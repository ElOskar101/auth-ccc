import {passwordRules} from "@/app/pages/auth/schema/register.schema.ts";
import {useTranslation} from "react-i18next";

interface PasswordRulesProps {
    password: string;
}

export const PasswordRule = ({password}: PasswordRulesProps) => {
    const { t } = useTranslation();
    return (
        <ul className="mt-2 space-y-1 text-sm">
            {passwordRules.map(rule => {
                const valid = rule.test(password);
                return (
                    <li
                        key={rule.label}
                        className={valid && password ? 'text-green-600 dark:text-green-500' : 'text-gray-400'}>
                        {valid ? '✔' : '•'} {t(rule.label)}
                    </li>
                );
            })}
        </ul>
    );
}