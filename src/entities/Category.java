package entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the Category database table.
 * 
 */
@Entity
@NamedQuery(name="Category.findAll", query="SELECT c FROM Category c")
@Table(name="Category")
public class Category implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idCategory;

	private String name;

	//bi-directional many-to-many association to Item
	@ManyToMany(mappedBy="categories")
	private List<Item> items;

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

}