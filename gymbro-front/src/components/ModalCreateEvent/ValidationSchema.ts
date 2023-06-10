import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    title: Yup.string().nullable().required('*Digite o título'),
    description: Yup.string().nullable().required('*Digite a descrição'),
    date: Yup.date().min(new Date(Date.now() - 86400000), '*A data não pode ser anterior à data atual').required('*Digite a data'),
    time: Yup.string().test(
        'hora-atual',
        '*A hora não pode ser anterior à hora atual',
        function (value) {
            if (!value) {
                return true;
            }

            const dataInformada = new Date(this.parent.date);
            const horaInformada = new Date(value);

            const currentTime = new Date();
            const inputTime = new Date(
                dataInformada.getFullYear(),
                dataInformada.getMonth(),
                dataInformada.getDate(),
                horaInformada.getHours(),
                horaInformada.getMinutes()
            );
            const currentTimeWithoutSeconds = new Date(
                currentTime.getFullYear(),
                currentTime.getMonth(),
                currentTime.getDate(),
                currentTime.getHours(),
                currentTime.getMinutes()
            );

            return inputTime >= currentTimeWithoutSeconds;
        }
    ).required('*Digite a hora'),
    location: Yup.array().test(
        'Local',
        'Escolha o local do evento',
        function(value){
            console.log(value)
            return value && value?.length > 0
        }
    ).required('*Digite o local')
})