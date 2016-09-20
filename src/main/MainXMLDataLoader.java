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
		
		for(int i = 0; i < 40; i++) {
			//String fullPathName = "/home/dimitris/Desktop/ted/ebay-data/items-"+i+".xml";
			String pathName = "./ebay-data/items-"+i+".xml";
			System.out.println("file "+i);
			//Items items = (Items) unmarshaller.unmarshal(new FileReader(fullPathName));
			Items items = (Items) unmarshaller.unmarshal(new FileReader(pathName));
			for (Item crawl : items.getItem()) {
				if (crawl.getBids().getBid().size() > 0) {
					if (crawl.getCurrently()  != null) {
						ItemDAO itemDB = new ItemDAO();
						itemDB.insert(ItemWrapper.map(crawl));
					}
				}
			}
		}
	}

}
