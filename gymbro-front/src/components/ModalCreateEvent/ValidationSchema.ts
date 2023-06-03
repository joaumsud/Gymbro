import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    title: Yup.string().required('*Digite o título'),
    limitCount: Yup.number().nullable().required('*Informe a quantidade'),
    description: Yup.string().nullable().required('*Digite a descrição'),
    date: Yup.date().min(new Date(Date.now() - 86400000), 'A data não pode ser anterior à data atual').required('*Informe a data'),
    time: Yup.string().test(
        'hora-atual',
        'A hora não pode ser anterior à hora atual',
        function (value) {
            if (!value) {
                return true;
            }

            const currentTime = new Date();
            const inputTime = new Date(value);
            const currentTimeWithoutSeconds = new Date(
                currentTime.getFullYear(),
                currentTime.getMonth(),
                currentTime.getDate(),
                currentTime.getHours(),
                currentTime.getMinutes()
            );

            return inputTime >= currentTimeWithoutSeconds;
        }
    ),
})