import { Grid, Skeleton } from "@mui/material"

const CustomSkeleton: React.FC = () => {
    return (
        <Grid container>
            {Array.from(new Array(6)).map((item, index) => (
                <Grid item md={6} sm={12} p={1} lg={4} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton width="100%" />
                </Grid>
            ))}
        </Grid>
    )
}

export default CustomSkeleton;