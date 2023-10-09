import StyledBadge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BotonCarrito = () => {
    return (
            <StyledBadge badgeContent={10} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
    )
}

export default BotonCarrito;