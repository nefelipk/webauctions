package model.wrappers.toXML;

public class LocationWrapper {
	public static main.XMLMapping.Location map(model.Location l) {
		main.XMLMapping.Location location = new main.XMLMapping.Location();
		location.setLatitude(new Float(l.getLatitude()).toString());
		location.setLongitude(new Float(l.getLongitude()).toString());
		location.setvalue(l.getLocation());
		return location;
	}
}
