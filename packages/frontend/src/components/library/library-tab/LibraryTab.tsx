import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';

interface ILibraryTab {
    headline: string
    amount: number
    selected: boolean
    click: Function
    children?: JSX.Element
}

const LibraryTab = (props: ILibraryTab) => {
    const { click, headline, amount, selected } = props;

    const getButtonStyle = () => {
        const sx = { textTransform: "none", borderBottom: '1px solid lightgray' }
        if (selected) {
            return { ...sx, backgroundColor: "#DCDCDC" };
        }
        return sx;
    }

    return (
        <Button
            fullWidth
            variant="text"
            sx={getButtonStyle()}
            onClick={() => click()}
        >
            {props.children}
            <Typography component={'span'} fontWeight="bold" padding="5px">
                <Grid container fontSize={22}>{amount}</Grid>
                <Grid container fontSize={22} color="black">{headline}</Grid>
            </Typography>
        </Button>
    );
}

export default LibraryTab;