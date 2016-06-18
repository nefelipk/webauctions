package main;

import java.io.FileReader;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import main.xmlMapping.Items;

public class MainXMLDataLoader {
	
	public static void main(String[] args) throws Exception {
		JAXBContext context = JAXBContext.newInstance(Items.class); 
		Unmarshaller unmarshaller = context.createUnmarshaller();
		Items items = (Items)unmarshaller.unmarshal(new	FileReader("/home/dimitris/Desktop/ted/ebay-data/items-0.xml")); 
		System.out.println(items); 	
	}
}
