package main.XMLMappingWrappers;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import entities.User;

public class RandomUserGenerator {
	
	public static entities.User createRandomUser() {
		entities.User user = new User();
		user.setAdmin(false);
		user.setAfm(afmGenerator());
		user.setEmail(emailGenerator());
		user.setName(nameGenerator());
		user.setSurname(surnameGenerator());
		user.setPassword(passwordGenerator());
		user.setPhone(Integer.valueOf(phoneGenerator()));
		user.setVerified(true);
		return user;
	}
	
	
	private static int randInt(int min, int max) {
		int rand = ThreadLocalRandom.current().nextInt(min, max + 1);
		;
		return rand;
	}

	private static String passwordGenerator() {
		return generatePassword(randInt(6,10));
	}

	private static String emailGenerator() {
		StringBuilder builder = new StringBuilder();
		builder.append(generateName(randInt(4,9)));
		builder.append('@');
		builder.append(generateName(randInt(4,9)));
		builder.append(".com");
		return builder.toString();
	}

	private static String afmGenerator() {
		return generateNumber(16);
	}

	private static String phoneGenerator() {
		return generateNumber(8);
	}

	private static String nameGenerator() {
		return generateName(randInt(4,9));
	}

	private static String surnameGenerator() {
		return generateName(randInt(4,9));
	}

	private static Random rand = new Random();
	private static final String CONS = "zxcvbnmlkjhgfdsqwrtyp";
	private static final String VOWELS = "aeiou";// String which store vowels

	private static String generateName(int len) {
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			if (i % 2 == 0)
				sb.append(CONS.charAt(rand.nextInt(CONS.length())));
			else
				sb.append(VOWELS.charAt(rand.nextInt(VOWELS.length())));
		}
		return sb.toString();
	}

	private static char[] allowedCharacters = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+".toCharArray();

	private static String generatePassword(int length) {
		SecureRandom random = new SecureRandom();
		StringBuffer password = new StringBuffer();

		for (int i = 0; i < length; i++) {
			password.append(allowedCharacters[random.nextInt(allowedCharacters.length)]);
		}
		return password.toString();
	}
	
	private static char[] numbers = "0123456789".toCharArray();
	
	private static String generateNumber(int length) {
		SecureRandom random = new SecureRandom();
		StringBuffer number = new StringBuffer();

		for (int i = 0; i < length; i++) {
			number.append(numbers[random.nextInt(numbers.length)]);
		}
		return number.toString();
	}
}
