package model;

import java.util.List;
import java.util.Objects;

public class Category {
	private String name;
	private List<model.Item> items;
	
	public List<model.Item> getItems() {
		return items;
	}

	public void setItems(List<model.Item> items) {
		this.items = items;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.name);
	}

	@Override
	public boolean equals(Object obj) {
		return (obj instanceof Category && ((Category) obj).name.equals(this.name));
	}

	@Override
	public String toString() {
		return this.name;
	}
}
