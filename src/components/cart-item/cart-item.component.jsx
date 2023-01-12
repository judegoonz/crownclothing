
import { CartItemContainer, ItemDetails, Name, Price, Image } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return(
        <CartItemContainer>
            <Image src={imageUrl} alt={`${name}`}/>
                <ItemDetails>
                    <Name as='span'>{name}</Name>
                    <Price as='span'>
                        {quantity} x ${price}
                    </Price>
                </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;