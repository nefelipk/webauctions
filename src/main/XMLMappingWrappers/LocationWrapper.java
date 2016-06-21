package main.XMLMappingWrappers;

import main.XMLMapping.Location;

public class LocationWrapper {
	public static entities.Location map(Location l,String country) {
		entities.Location location = new entities.Location();
		if(l == null) {
			location.setCountry("Greece");
			location.setLocation("Athens");	
			return location;
		}
		
		if(country == null)
			country = "Greece";
		location.setCountry(country);
		location.setLocation(l.getvalue());
		if(l.getLongitude() != null)
			location.setLongitude(Float.valueOf(l.getLongitude()));
		if(l.getLatitude() != null)
			location.setLatitude(Float.valueOf(l.getLatitude()));
		return location;
	}
}
