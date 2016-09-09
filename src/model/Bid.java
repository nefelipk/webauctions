package model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class Bid {

	private float amount;
	private String time;
	@JsonIgnoreProperties(ignoreUnknown = true)
	private Item item;
	@JsonIgnoreProperties(ignoreUnknown = true)
	private User user;

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
