---
foo: 'bar'
---

<!-- Do not translate this code -->
<a id="dataset"/>

## 1. How to create a corpus (dataset)
        
This tool will analyze a corpus (a dataset) of text documents.
Each document is simply a bit of text that you found on the web (or elsewhere).
It can be as short as a sentence, or as long as a newspaper article.
But it has to be just text (no images or other media).

First, let's see how it works, then we will see where to find documents and how to select them.

#### How to get started

Click on "Get started" in the menu to load the "Documents" page.

**If you just want to see the tool in action**, load an example from the menu at the bottom of the screen.

<img class="border vdl-pic pic-w-250" src="/vandolie/img/screenshots/en/dataset-load-example.png" alt="Add document">

**If you want to make your own corpus**, then click on "Add document" to start editing your first document.

<img class="border vdl-pic pic-w-250" src="/vandolie/img/screenshots/en/dataset-add-doc.png" alt="Add document">

This will open an interface to edit your first document.

<img class="border vdl-pic pic-w-250" src="/vandolie/img/screenshots/en/dataset-doc-empty.png" alt="Empty document">

A document consists of three parts:

1. A title
2. Textual content
3. A category

#### How to fill a document

Let's assume that you have a source of information, like a Wikipedia page, to use as a document.

* **First, give a title.** You can invent it, or reuse your source's title (if it has one). It is just a way to identify your document easily. Type it in the top field of the interface.
* **Second, copy-paste the textual content of your source** into the middle field of the interface.
* **Third, type a category** in the bottom field. *Be consistent in your spelling, or else each different spelling will count as a different category.* We explain how to decide categories down below.

Once you have filled all three parts, you can save your document by clicking on the "Save" button. *Note that you cannot save your document if it is not complete.*

#### How to manage the dataset

You can create as many documents as you want.

<img class="border vdl-pic pic-w-1000" src="/vandolie/img/screenshots/en/dataset-saved-docs.png" alt="3 documents">

We think you need at least 10 documents, but 20 is a better number. You could go up to 50, or more if your computer is powerful enough (it will take more time to compute).

**Click on a saved to enter edit mode again.** You can change it, or even delete it. Remember to save (or cancel) your changes.

<img class="border vdl-pic pic-w-1000" src="/vandolie/img/screenshots/en/dataset-saved-docs-edit.png" alt="3 documents with one in edit mode">

You can **save your dataset** by clicking on the "Save (CSV)" button. You will be able to upload it later on, or share it with other people.

**Once your corpus is ready, click on one of the three algorithms available** just below your set of documents. They do different things. You can try them all. You will be able to come back to your documents and edit them if you want.

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/dataset-actions.png" alt="3 algorithms">

<!-- Do not translate this code -->
<a id="method-help"/>

### Where to find documents and how to decide categories?

First of all, you can just try the tool and experiment with it to understand why categories matter. Feel free to **experiment**.

That being said, you will obtain the best results if, first, you can find documents that naturally separate in two parts, like water and oil; second, that your categories reflect these two parts; and third, that it is not completely obvious that the two groups are well separated.

If you add two groups of documents that are completely different, for instance articles about cheese and articles about sailing, they will separate but that is not interesting because we know for sure that they will. Maybe that would be interesting if they did *not* separate.

**The good documents and categories should always be a little bit surprising.** If you add two groups of documents where it is hard to know if they will be the same or not, then it is interesting. It provides a new information, because we did not know. You will find examples below.

The documents and the categories go together. Select them to make an interesting **comparison**. Think of them as a way to ask question such as: "Do you think that documents A and documents B are similar or different?" And of course, that question is interesting if it does not have an obvious answer. The algorithms will allow you to find and answer to the question you ask.

You could **compare how we talk of two similar things**. For example, you could compare how we talk about two religions, or men and women, or two nationalities, etc. That could be a way to look into discrimination. For instance, you could compare Wikipedia articles about male pop artists with Wikipedia articles about female pop artists. This would ask the question: "Are Wikipedia articles about male and female pop artists different or the same?" The answer is not obvious because, on the one hand, they are all pop artists, but on the other hand, they are men and women. So it is an interesting thing to look at.

You could also **compare how two different media write about the same thing**. You could compare how left-wing newspapers and right-wing newspapers write about the same subject, for instance immigration, the European Union, or nuclear energy. Or you could compare how a same topic is discussed on social media (Reddit, Facebook...) versus on mainstream media (newspapers, TV channels...). Or you could compare local press and national press, or the local press in one region and in another region, etc.

There are yet other ways to make interesting comparisons, like old articles versus new articles (ex: before and after Covid), science versus popular culture, etc. Be creative!

The important is to pick documents that have the difference you aim to compare, but no other difference. If you compare documents from two media, keep a same topic; conversely, if you compare two topics, pick documents from the same media or similar ones.

In this tool, **a document can be any text**. Don't be afraid to copy-paste texts that don't look like traditional documents, for example discussions on social media. Not every document has to look serious and official. It depends on what you want to compare. What normal people say over the internet also counts as a information worth analyzing.

You will find documents in many public websites: [Wikipedia](https://www.wikipedia.org/), the [Internet Movie Database](https://www.imdb.com/), [Fandom](https://www.fandom.com/)...

You can also use social media such as [Reddit](https://www.reddit.com/), [YouTube](https://www.youtube.com/) (look at the comments), etc.

And via libraries, you can also have access to newspaper articles from many outlets. Those are normally behind a paywall, but libraries often provide a special free access to them.

<!-- Do not translate this code -->
<a id="count"/>

## 2. How to use: Count the words

This algorithm simply counts in how many documents a given word is mentioned. Note that it does not matter if the word appears once or multiple times in a same document.

Type any word in the search field (and hit Enter) to start the counting.

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-search.png" alt="Search field">

By default, this will not count the exact word, but any word that contains it. For example, "train" will also count "trains" and "training". If you do not want that, check the setting "Exact word".

<img class="border vdl-pic pic-w-250" src="/vandolie/img/screenshots/en/count-exact.png" alt="Exact word button">

Alternatively, click on one of the **top words** to search for it. Those are defined as the 25 words appearing in the largest number of documents, stop words aside. The number in parentheses indicates in how many documents they appear.

<img class="border vdl-pic pic-w-1000" src="/vandolie/img/screenshots/en/count-topwords.png" alt="Top word buttons">

*Note: you can find other good words to analyze in "Co-word network".*

### Word counting results

Your search will show you the result of counting how many documents contain your word in two ways.

*First*, a bar chart displaying the percentage of documents mentioning your query for each category. The bigger the bar for each category, the largest proportion of documents in that category mention the word you queried.

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-barchart1.png" alt="Bar chart">

*Second*, details about where the word is mentioned in each document (if it is).

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-details.png" alt="Details about each document">

Use those details to verify that your query works as intended.

### Try to find words that match only one category

The interesting words are those appearing in only one of those categories, and not the other. These words characterize a specific category.

Here is an example with the dataset about male and female pop artists on Wikipedia, which is one of the sample datasets you can try.

The word "he" is only present in the descriptions of male artists...

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-barchart2.png" alt="Bar chart">

...while the word "she" is (almost) only present in the descriptions of female artists.

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-barchart3.png" alt="Bar chart">

*Note: this only works if you search for the **exact word**, since of course "he" is contained in "she"!*

This example may be too obvious to be really interesting, but it shows you what it means, for a word, to be characteristic of a single category. The next examples, with the same dataset, might be more interesting.

The word "band" is mostly associated with male artists. Perhaps more of them play in a band than female artists?

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-barchart4.png" alt="Bar chart">

The word "highest-paid" is mostly associated with female artists. Perhaps the success of female artists is more often measured with money than the success of male artists?

<img class="border vdl-pic pic-w-750" src="/vandolie/img/screenshots/en/count-barchart5.png" alt="Bar chart">

This algorithm does not give you a definitive answer, but it helps asking interesting questions.

To find interesting words, use the next algorithm, "Co-word network", and look for words colored strongly like one specific category.

<!-- Do not translate this code -->
<a id="network"/>

## 3. How to use: Co-word network

TODO

<!-- Do not translate this code -->
<a id="semantic"/>

## 4. How to use: Semantic map

TODO

