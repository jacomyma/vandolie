---
foo: 'bar'
---

#### Summary
* [Learning goals](#learning-goals)
* [Suggested pedagogical scaffolding](#scaffolding)
* [Bingo of Words](#bingo)

<!-- Do not translate this code -->
<a id="learning-goals"/>

## Learning goals

Vandolie addresses 3 main goals:
1. Allow a discussion about algorithms and information
2. Allow mapping controversies in a simple way
3. Empower students for their own projects


The **key message about algorithms** is that **analyzing text is just about counting words in fancy ways**. Vandolie proposes three algorithms, from simple to complicated ways of counting words. With the help of their teacher, the students can understand some of these algorithms, and demystify them.

The purpose of these algorithms is to allow you to identify patterns in the content of some documents. The process is not magical. It can be done manually, at least for the simple algorithms. We offer an activity to do it in a fun way, the "**Bingo of words**" (more info below).


The **key message about mapping controversies** is that people disagree because they have **different perspectives and priorities**.

Contrary to what one may believe, people rarely have a firm opinion and rarely disagree about whether one specific thing is good or bad. Most of the time, either they don't know, or they agree. Most people don't know if polyfluoroalkyl substances are carcinogen. And most people agree that being healthy and having empathy are good things, while pollution and violence are bad things.

But people have different priorities. When they think of foie gras, some picture the tasty traditional dishes, while others picture the suffering of the geese. But even food lovers understand the ethical issues with "gavage", and animal rights advocates can acknowledge that foie gras tastes good to many people. They simply have different perspectives and priorities. That is why, when they speak publicly, they will never mention the other sides of the controversy, where they know they would lose the battle. Meat lovers will not try to convince you that geese enjoy force-feeding, because you would not believe it. And similarly, animal welfare advocates will not try to convince you that foie gras taste bad. Instead, the former will tell you about taste and tradition, while the latter will tell you about ethics and animal welfare.

At the end of the day, **controversies rarely have proponents and opponents of a same thing**, but rather multiple groups of people who talk about certain aspects of the controversy while actively ignoring others. **The underlying idea with *Vandolie* is to allow you to reveal this kind of pattern with algorithms and visualizations.**


The **key idea about empowering students** is to have them become more **critical** of AI, algorithms, the information society (newspapers, internet and social media) by **engaging with computational means**. *Vandolie* gives them the opportunity to analyze information by themselves, and discover patterns on their own. We expect that this engagement with algorithms and information naturally raises concerns that can then be used in the classroom to spark discussions about of digital environment. We would be really happy that students use *Vandolie* in for their own high school projects, and start learning-by-doing simple text analysis techniques.


<!-- Do not translate this code -->
<a id="scaffolding"/>

## Suggested pedagogical scaffolding

*Vandolie* is built to allow various kinds of users to repurpose it in different ways. In that sense, it works on its own without requiring a specific pedagogical scenario. Some teachers may use it to give a feeling of how algorithms and AI function, while others may use it to elicit a discussion about information on social media.

That being said, we propose an introductory activity to *Vandolie*, the "Bingo of Words", that could be enacted in about one hour in the classroom. The activity is described below, but in short, it makes the students play the algorithm themselves physically, without the computer, using only special Bingo cards you have to print.

We therefore suggest the following scaffolding:
1. **Play the "Bingo of Words"** with the students
2. Discuss how **algorithms reveal patterns** in text by just counting the right things
3. **Introduce *Vandolie*** with the same dataset as the Bingo, and show that it gives the same results
4. Showcase *Vandolie* with an **example dataset**, and notably the semantic map (not covered by the Bingo)
5. Make a **collective dataset** with the students. This takes time, but may be worth it if you want to discuss the nature of information on various media.
6. Discuss some **properties of information**, notably social media versus mainstream media. Help the students be more aware and more critical of information over the internet, and possibly AI-generated texts as well (ChatGPT...).
7. Help the **students make their own datasets**. This is productive insofar as it can help them achieve some school projects.

The most difficult part is *not* to succeed in making the tool work and to become familiar with the algorithms and visualizations.

The most difficult part is to find which categories allow you to have an interesting interpretation of the visual patterns.

**We recommend the following strategy:** look if there are distinct clusters in the semantic map, then walk backwards to find good categories. If the semantic map does not show clusters, it simply means that the documents have essentially the same content. But if there are clusters, then it is possible to understand what they are about. Look at the co-word network, and you should be able to find some clusters too. Think of these clusters as *topics*. Look at the words composing the topics, and find a short label for each topic. These could become your categories. Go back to the dataset, and use these categories to qualify the documents. If this strategy is successful, you should obtain categories that match the clusters in the semantic map.


<!-- Do not translate this code -->
<a id="bingo"/>

## Bingo of Words

#### Preparation

First, **read** this section.

Second, **print the bingo cards**. The PDF contains 20 different sheets, and you will need all of them, but only once. Only print one set, even if you have more than 20 students.

<a href="../data/Bingo of Words - Documents - EN.pdf" target="_blank">DOWNLOAD the BINGO CARDS [PDF]</a>

Third, **print the guide** for yourself (just once). It will help you during the activity.

<a href="../data/Guide EN.pdf" target="_blank">DOWNLOAD the TEACHER GUIDE [PDF]</a>

You are now ready.


#### What it looks like

The bingo cards represent documents. But to make things easier, they are very short: a short sentence. They will be distributed to the students.

The topic of the cards is veganism. We selected it because it is the kind of topic that is relatable to high school students and works well in *Vandolie*. Intuitively, some documents are on the meat-lover side while others are on the vegan side. But the students do not have to be aware of it, as the pattern will emerge naturally during the activity.

In principle, each student will have one bingo card. There will be two rounds of bingo, during which you (the teacher) will call for a word or a combination of words. Then each student has to raise their hand if they have that word or combination of words in their bingo cards.

By counting word combinations, you will be able to build a network of co-occurrence between words (or "co-word network"). This network will have two sides, one with the meat-eater perspective, and one with the vegetarian perspective. The activity ends on the constatation that we have produced a pattern that reveals the structure of the discourses in the dataset (that there are two distinct perspectives).


### Bingo steps

Those steps are recapitulated in the <a href="../data/Guide EN.pdf" target="_blank">teacher's PDF guide</a>, but we provide more details here.

#### Preparation: Give the cards

**Give the bingo cards to the students.** You may make groups if you prefer, or if you have more than 20 students. If you have less than 20 students, consider giving multiple cards per student, or allocate some cards to yourself. **It is important that each of the 20 cards is in someone's hand**, or else the results of the counting will not be the same and the activity may not be successful.

#### Step 1: Make the list of all the words

We want to **make the list of all the words in all the documents**. We could do it manually, but since it is tedious, we use the list prepared ahead of time. That is something you can tell the students.

The list is provided in the guide. You can either display it from your computer, or take the time to redraw it on a board.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-1.png" alt="Bingo figure 1">

**Discussion point:** Some words are similar (ex: “animal” and “animals”). Should we merge them? This is a good question, as algorithms often give you the choice. The process of merging the words that are essentially the same is called "lemmatization". But it is a complex technique. We will not do it in this activity, and *Vandolie* does not support it, but more advanced tools offer you the choice.

***Note about discussion points:** the other discussion points will always give a similar answer. Ideally, those questions would arise naturally from the students enacting the process of counting. Those questions are always good, as they point to decisions that must be made within the algorithm. The lesson to learn is that the settings of algorithms come from there, from the fact that there are different ways of counting things, and that there is none that is always "the best", and it always depends.*

#### Step 2: Remove the stop words

Before we count the words, we need to remove some useless words. We consider that some tool words are always there in a given language, such as "a", "the", "is", etc. We call those "stop words".

Simply cross out the stop words from the list. Check that you get the same result as in the guide, because it matches the list of stop words used in *Vandolie*.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-2.png" alt="Bingo figure 2">

**Discussion point:** What is a stop word? That is a good question. There are different lists on the internet. Of course, it depends of the language. But even so, some arbitrary choices must be made. It depends on the context. Here we use a generic list that is often considered good-enough for simple tasks.

#### Step 3: Play BINGO with the remaining words

The bingo cards are the sentences given to the students, and we play with the words. Take each remaining word (not crossed out) in the list, and call for it. The students must look at their card, and raise their hand if they have the document. Ensure that only one hand is raised per card (per group of students if you have groups). Count the raised hands, and report the number in the list, next to that word.

In essence, we are counting the number of documents containing each word.

Note that we must respect the differences between the words. If we call for "animal", it does not work with "animals". We must stick to our decision from earlier about not merging similar words.

The expected result is in the guide. Ensure you have the same numbers. **If you lack time, you can just start the activity to show the principle then jump to the results.**

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-3.png" alt="Bingo figure 3">

**Discussion point:** Do we count when a word appears multiple times in the same document? Excellent question. This is something we could decide to do, but we will not in this activity. *Vandolie* gives you the possibility to do it if you want. The results would be different, sometimes better, and sometimes not. It depends on the size and number of documents, among other factors.

#### Step 4: Remove infrequent words

We are not interested in the words that are too rare. It is a well known fact that in any language, most words are rare while a few words are incredibly frequent (which is known as [Zipf's law](https://en.wikipedia.org/wiki/Zipf%27s_law)). We want to focus on the words that create commonality between documents. We want to focus on the words that appear in multiple documents.

We simply do this by removing the words that appear less than a certain threshold. In this activity, we set this threshold to 3. We keep the words that appear in at least 3 documents, and we remove those that appear only once or twice.

In the words list, simply cross out the words with a count of 1 or 2. Doing this is the reason why we counted the number of occurrences at the previous step.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-4.png" alt="Bingo figure 4">

**Discussion point:** How to we know what is the right threshold? This is an excellent question. The answer is that we need to try. We want to have a network that is not too big, but also not too small. It is hard to predict what the threshold will produce until we actually try. In *Vandolie*, you can set your threshold.

#### Step 5: Display the co-occurrence matrix

We will soon count the pairs of words. To do that, we need to draw a table or "matrix" of the pairs of words. The rows and the columns are the remaining words, and we will mark in the cells whether or not the words appear together in a same document (or more).

Simply draw or display the matrix as it is shown in the teacher's guide.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-5.png" alt="Bingo figure 5">

**Remark** that some cells are grey and others are white. The white cells are the useful ones. The grey cells can be ignored. That is due to the matrix being "symmetrical": each pair of word appears twice, once in the top-right half, and once in the bottom-left half. But in this case we don't need to count pairs twice, so we omit one of the halves. Indeed, regardless of whether word A (row) co-occurs with word B (column), it will be the same as word B (row) co-occurring with word A (column). Swapping the words gives the same result. Similarly, we omit the diagonal because any word co-occurs with itself...

#### Step 6: Play BINGO with the pairs of words

We will now play BINGO once again, but a little differently this time. This step is the most interesting, it is the moment where we extract useful information from the set of documents (the bingo cards).

Look at the matrix and take each white cell in order (we omit the grey cells as they are redundant). For each cell, call for the corresponding pair of words (row and column). The students must check whether their bingo card has both words at the same time, and raise their hand if it is the case.

Simply not down whether at least one document has the pair. No need to count how many documents have it.

The expected result is in the guide. Ensure you have the same pairs. **If you lack time, you can just start the activity to show the principle then jump to the results.**

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-6.png" alt="Bingo figure 6">

**Discussion point:** Should we count how many have each pair, or not? As usual, that is something we could decide to do. In fact, there are even more sophisticated ways of counting co-occurrences, such as "pointwise mutual information", which you can use in *Vandolie* if you want. It often improves the results to some extent.

#### Step 7: Draw network

The last step is simply to draw the matrix as a network map, where each word is a dot, and each co-occurrence (marked cell) is a line connecting the co-occurring words (row and column). You should obtain the figure presented in the guide.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-7.png" alt="Bingo figure 7">

We encourage you to actually draw the figure in front of the students, so that they understand where it comes from. Place the words first, then draw the lines by reading the matrix. **The trick is to place the words as in the picture** to avoid too many line crossings.

#### Interpretation of the network

The end of the activity consists in discussing whether there is a pattern that the students can identify in the network.

The pattern we expect them to find is that the network has two sides. On the left side, we have words such as "meat", "culture", "eat", "tradition", and "love". This represents the perspective of the people who eat meat. On the right side, with words such as "animals", "killing", "live" and "welfare", we have the vegetarian perspective. What makes them two sides, is that they are only connected through one word: "meat". **Most documents represent only one of the two perspectives, which is why they are disconnected.** "Killing" does not co-occur with "culture", "welfare" does not co-occur with "tradition", etc.

The lesson from this is that we can see general patterns emerging from the distribution of words in a set of document. This is called ["Distant reading"](https://en.wikipedia.org/wiki/Distant_reading), and it is a way to read many documents at once to extract useful information.

A good question to ask to the students is about the word "love". It is plausible that "love" would be on the side of vegetarians, who love animals and want to save their lives. Then why is it on the meat-eaters' side? Because "love" is mostly mentioned, in this corpus, to signify the love of meat. This can be verified by asking the students who have a card with "love" to read it out loud. The lesson to learn from this is that the words do not always behave like they should, or rather like we expect; which is why it is important to complement distant reading with "close reading" (that is, normal reading).

#### How the Bingo of Words is related to *Vandolie*

The algorithm "co-word network", in *Vandolie*, does exactly the same thing as the Bingo of Words. If you have had the occasion to discuss the different ways to count the words with the students, mention that some of those choices are appearing as settings in the tool.

If the students want to check that they get the same results as the Bingo of Words, they will find the corpus in the provided examples. Of course, the result will be the same if they use the same settings!

<img class="border vdl-pic" src="/vandolie/img/screenshots/en/bingo-8.png" alt="Bingo figure 8">
