package model.wrappers.toXML;

public class SellerWrapper {
	public static main.XMLMapping.Seller map(model.User u) {
		main.XMLMapping.Seller seller = new main.XMLMapping.Seller();
		seller.setRating(new Float(u.getRatingBidder()).toString());
		seller.setUserID(new Integer(u.getId()).toString());
		return seller;
	}
}
