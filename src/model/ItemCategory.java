package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the ItemCategory database table.
 * 
 */
@Entity
@NamedQuery(name="ItemCategory.findAll", query="SELECT i FROM ItemCategory i")
public class ItemCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ItemCategoryPK id;

	//bi-directional many-to-one association to Category
	@ManyToOne
	@JoinColumn(name="idCategory")
	private Category category;

	public ItemCategory() {
	}

	public ItemCategoryPK getId() {
		return this.id;
	}

	public void setId(ItemCategoryPK id) {
		this.id = id;
	}

	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

}