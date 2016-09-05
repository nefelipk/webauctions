package model.wrappers;

import java.util.ArrayList;
import java.util.List;

public class MessageWrapper {
	public static model.Message map(entities.Message m) {
		model.Message message = new model.Message();
		message.setId(m.getIdMessage());
		message.setMessage(m.getMessage());
		message.setRead(m.getRead());
		message.setReceiverUsername(m.getUser2().getUsername());
		message.setSenderUsername(m.getUser1().getUsername());
		message.setTime(m.getTime().toString());
		return message;
	}
	
	public static List<model.Message> mapList(List<entities.Message> m) {
		List<model.Message> messages = null;
		if (m != null && m.size() > 0) {
			messages = new ArrayList<model.Message>();
			for (entities.Message crawl : m) {
				model.Message message = model.wrappers.MessageWrapper.map(crawl);
				messages.add(message);
			}
		}
		return messages;
	}
}
