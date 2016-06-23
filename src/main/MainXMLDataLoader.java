package main;

import java.io.FileReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import dao.ItemDAO;
import main.XMLMapping.Item;
import main.XMLMapping.Items;
import main.XMLMappingWrappers.ItemWrapper;

public class MainXMLDataLoader {

	public static void main(String[] args) throws Exception {
		JAXBContext context = JAXBContext.newInstance(Items.class);
		Unmarshaller unmarshaller = context.createUnmarshaller();
		Items items = (Items) unmarshaller
				.unmarshal(new FileReader("/home/dimitris/Desktop/ted/ebay-data/items-0.xml"));

		for (Item crawl : items.getItem()) {
			/*
			 * for(Bid b : crawl.getBids().getBid()) { entities.User userEntity
			 * = UserWrapper.mapBidder(b.getBidder());
			 * //System.out.println(UserWrapper.mapBidder(b.getBidder()).
			 * toString()); UserDAO userDB = new UserDAO(); int id =
			 * userDB.insert(userEntity); } entities.User userEntity =
			 * UserWrapper.mapSeller(crawl.getSeller()); UserDAO userDB = new
			 * UserDAO(); int id = userDB.insert(userEntity);
			 */
			if (crawl.getBids().getBid().size() > 0) {
				if (crawl.getCurrently()  != null) {
					ItemDAO itemDB = new ItemDAO();
					itemDB.insert(ItemWrapper.map(crawl));
				}
			}
		}

		// System.out.println(items);

	}

}
