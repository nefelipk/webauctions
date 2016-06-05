package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the Category database table.
 * 
 */
@Entity
@NamedQuery(name="Category.findAll", query="SELECT c FROM Category c")
public class Category implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idCategory;

	private String name;

	//bi-directional many-to-many association to Item
	@ManyToMany(mappedBy="categories")
	private List<Item> items;

	//bi-directional many-to-one association to ItemCategory
	@OneToMany(mappedBy="category")
	private List<ItemCategory> itemCategories;

	public Category() {
	}

	public int getIdCategory() {
		return this.idCategory;
	}

	public void setIdCategory(int idCategory) {
		this.idCategory = idCategory;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Item> getItems() {
		return this.items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public List<ItemCategory> getItemCategories() {
		return this.itemCategories;
	}

	public void setItemCategories(List<ItemCategory> itemCategories) {
		this.itemCategories = itemCategories;
	}

	public ItemCategory addItemCategory(ItemCategory itemCategory) {
		getItemCategories().add(itemCategory);
		itemCategory.setCategory(this);

		return itemCategory;
	}

	public ItemCategory removeItemCategory(ItemCategory itemCategory) {
		getItemCategories().remove(itemCategory);
		itemCategory.setCategory(null);

		return itemCategory;
	}

}