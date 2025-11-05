import { AdditionalConfigProps } from "../page";

const nameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export function validateLocalForm(form: AdditionalConfigProps) {
    let errorForm: AdditionalConfigProps = {
        structureType: "",
        database: "",
        databaseName: "",
        databaseUser: "",
        databasePassword: "",
        auth: "",
        secretKey: ""
    }

    let isValid = true;

    if (!nameRegex.test(form.databaseName)) {
        errorForm.databaseName = "Nome do banco de dados não pode ser vazio e deve conter apenas letras, números e sublinhados.";
        isValid = false;
    }

    if (!nameRegex.test(form.databaseUser)) {
        errorForm.databaseUser = "Nome do usuário não pode ser vazio e deve conter apenas letras, números e sublinhados.";
        isValid = false;
    }

    if (form.auth == "yes" && (form.secretKey == undefined || form.secretKey.length < 1)) {
        errorForm.secretKey = "A chave deve conter no mínimo 1 caractere (recomendamos no mínimo 16).";
        isValid = false;
    }

    return {
        isValid: isValid,
        errorForm: errorForm
    }
}