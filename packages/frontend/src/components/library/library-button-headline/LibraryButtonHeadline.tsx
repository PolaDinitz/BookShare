import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';

interface ILibraryBook {
    headline: string
    amount: number
    selected: boolean
    click: Function
    children?: JSX.Element
}

const LibraryButtonHeadline = (props: ILibraryBook) => {
    const { click, headline, amount, selected } = props;

    const getButtonStyle = () => {
        const sx = { textTransform: "none" }
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
            <Typography fontWeight="bold" padding="5px">
                <Grid container fontSize={22}>{amount}</Grid>
                <Grid container fontSize={22} color="black">{headline}</Grid>
            </Typography>
        </Button>
    );
}

export default LibraryButtonHeadline;