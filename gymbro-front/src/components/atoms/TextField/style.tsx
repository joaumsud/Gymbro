import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
	inputStyle: {
		boxShadow: '0 0 0 0',
		borderRadius: '0px',
		border: '0 none',
		outline: '0',
		borderBottom: '1.5px solid #07142B',
		backgroundColor: 'rgba(0,0,0,0)',
		'&::placeholder': {
			fontSize: '18px',
			color: 'rgba(7, 20, 43,0.75)'
		}
	}
}));