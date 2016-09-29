package entities.wrappers;

public class LocationWrapper {
	public static entities.Location map(model.Location l) {
		entities.Location location = new entities.Location();
		location.setAddress(l.getAddress());
		location.setCity(l.getCity());
		location.setCountry(l.getCountry());
		location.setLatitude(l.getLatitude());
		location.setLocation(l.getLocation());
		location.setLongitude(l.getLongitude());
		location.setPostalCode(l.getPostalCode());
		location.setLocation(l.getLocation());
		location.setItems(null);
		return location;
	}
}
