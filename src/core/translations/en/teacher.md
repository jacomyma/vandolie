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

*Vandolie* pursues three main educational objectives:
1. Enable discussion about algorithms and information processing
2. Facilitate the mapping of controversies through accessible methods
3. Empower students to conduct their own research projects

### Understanding Algorithms

The **key message about algorithms** is that **text analysis is fundamentally about counting words in fancy ways**. *Vandolie* offers three algorithms that demonstrate progressively complex word-counting methods. With your guidance, students can understand these algorithms and demystify computational text analysis.

These algorithms help identify patterns in document content through systematic analysis rather than intuition. The process is transparent and can be performed manually, at least for simpler algorithms. We provide a hands-on activity, the "**Bingo of Words**" (detailed below), to demonstrate this principle engagingly.

### Mapping Controversies

The **key message about controversy mapping** is that people disagree due to **differing perspectives and priorities**, not fundamental opposition to the same concepts.

Contrary to common assumptions, people rarely hold firm opinions about whether specific things are definitively good or bad. Most often, they either lack knowledge or actually agree on basic values. For example, most people don't know whether polyfluoroalkyl substances are carcinogenic, and most agree that health and empathy are positive while pollution and violence are negative.

However, people prioritize different aspects of complex issues. Consider foie gras: some people focus on culinary tradition and taste, while others emphasize animal welfare concerns. Importantly, food enthusiasts generally acknowledge ethical concerns about force-feeding, and animal rights advocates can recognize that many people find foie gras appealing. The difference lies in priorities, not complete disagreement.

But communication strategies explain why public discourse often seems polarized. Each side emphasizes their strongest arguments while avoiding topics where they're vulnerable. Meat advocates don't claim geese enjoy force-feeding (because it's unconvincing), while animal welfare advocates don't argue that foie gras tastes bad (because it's irrelevant to their ethical concerns). Instead, the former emphasizes tradition and pleasure, while the latter focuses on ethics and animal welfare.

**Controversies rarely involve simple pro-and-con positions on identical issues.** Instead, they feature multiple groups discussing different aspects of complex topics while strategically avoiding others. ***Vandolie* reveals these patterns through algorithmic analysis and visualization.**

### Empowering Students

The **key objective for student empowerment** is developing **critical thinking** about AI, algorithms, and information systems (news media, internet, social media) through **hands-on computational engagement**. Vandolie enables students to analyze information independently and discover patterns through their own investigation.

This direct engagement with algorithms and information naturally raises questions that can spark classroom discussions about our digital environment. We hope students will use *Vandolie* for their own research projects, developing practical text analysis skills through experiential learning.

<!-- Do not translate this code -->
<a id="scaffolding"/>

## Suggested pedagogical scaffolding

*Vandolie* supports various pedagogical approaches and works effectively without requiring specific lesson plans. Some educators may use it to demonstrate how algorithms and AI function, while others may focus on information literacy and social media analysis.

We recommend beginning with the "Bingo of Words" activity, which can be completed in approximately one class period. This hands-on exercise has students manually perform algorithmic processes using printed materials, making abstract concepts concrete.

### Recommended Sequence

1. **Conduct the "Bingo of Words" activity** with students
2. **Discuss how algorithms reveal patterns** in text through systematic counting
3. **Introduce *Vandolie*** using the same dataset from the Bingo activity, demonstrating identical results
4. **Explore *Vandolie* features** with example datasets, particularly the semantic map (not covered in the Bingo activity)
5. **Create a collaborative dataset** with students (time-intensive but valuable for discussing information sources across different media)
6. **Analyze information characteristics**, comparing social media versus traditional media. Help students develop awareness and critical thinking about online information, including AI-generated content
7. **Support student-led projects** using their own datasets, particularly for research assignments

### Implementation Notes

The primary challenge is **not** mastering the tool or understanding algorithms and visualizations.

The main difficulty is **identifying categories that enable meaningful interpretation of visual patterns**.

**Recommended strategy:** Examine the semantic map for distinct clusters, then work backward to develop appropriate categories. If the semantic map lacks clear clusters, the documents likely contain similar content. However, when clusters appear, you can understand their themes by examining the co-word network for corresponding patterns. Consider these clusters as *topics*. Analyze the words comprising each topic and create concise labels. Use these labels as categories for your dataset. When successful, your categories should correspond to the clusters in the semantic map.

<!-- Do not translate this code -->
<a id="bingo"/>

## Bingo of Words

### Pre-Activity Preparation

**Review Materials**

Read this entire section before beginning the activity.

**Print Student Materials**

Print the bingo cards (PDF contains 20 unique sheets - print one complete set only, even with more than 20 students).

<a href="/vandolie/data/Bingo of Words - Documents - EN.pdf" target="_blank">DOWNLOAD the BINGO CARDS [PDF]</a>

**Print Teacher Guide**

Print the teacher guide for your reference during the activity.

<a href="/vandolie/data/Guide EN.pdf" target="_blank">DOWNLOAD the TEACHER GUIDE [PDF]</a>

### Activity Overview

The bingo cards represent documents simplified as short sentences for accessibility. The topic is veganism, chosen because it's relatable to high school students and demonstrates clear patterns in *Vandolie*. Some documents reflect meat-eating perspectives while others represent vegetarian viewpoints, though students don't need prior awareness as patterns emerge naturally.

Each student receives one bingo card. The activity includes two rounds where you call out words or word combinations. Students raise their hands when their cards contain the specified terms.

By counting word combinations, you'll construct a co-occurrence network (or "co-word network") that reveals two distinct perspectives: meat-eating and vegetarian. The activity concludes by demonstrating how systematic counting reveals discourse structures within datasets.

### Activity Steps

*These steps are summarized in the teacher's PDF guide with additional details provided here.*

#### Preparation: Distribute Cards

**Distribute bingo cards to students.** Form groups if preferred or if you have more than 20 students. With fewer than 20 students, give multiple cards per student or retain some cards yourself. **Each of the 20 cards must be held by someone** to ensure accurate counting results.

#### Step 1: Compile Word Inventory

**Create a comprehensive list of all words appearing in all documents.** Rather than doing this manually (which would be tedious), use the prepared list from your guide. Explain to students that this preprocessing step is standard in text analysis.

Display the word list on your screen or write it on the board.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-1.png" alt="Bingo figure 1">

**Teaching moment:** Students may notice similar words (e.g., "animal" and "animals") and ask whether these should be combined. This excellent question highlights "lemmatization" - the process of reducing words to their root forms. While advanced tools offer this feature, we'll maintain word distinctions for this activity, as does *Vandolie* in its basic settings.

*Note: These teaching moments address decisions embedded in algorithmic processes. When students raise these questions naturally, emphasize that algorithm settings derive from such choices, with no universally "best" approach - effectiveness depends on context.*

#### Step 2: Remove Stop Words

Before counting, eliminate common function words that provide little analytical value. These "stop words" include articles, prepositions, and auxiliary verbs (e.g., "a," "the," "is") that appear frequently in any language but don't contribute to meaning.

Cross out stop words from your list. Verify your results match the guide, as this aligns with *Vandolie*'s stop word list.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-2.png" alt="Bingo figure 2">

**Teaching moment:** What constitutes a stop word? Different lists exist online, varying by language and context. Generic lists work well for basic tasks, but specialized analyses might require custom stop word lists.

#### Step 3: Count Word Occurrences

Using the remaining (non-crossed-out) words, call out each word individually. Students check their cards and raise their hands if the word appears. Ensure only one hand per card/group is raised. Count the responses and record the number beside each word.

This process counts how many documents contain each word (not how many times each word appears).

Maintain precision - "animal" doesn't match "animals" based on our earlier decision about word variations.

Expected results appear in your guide. **If time is limited, demonstrate the principle briefly, then proceed to the results.**

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-3.png" alt="Bingo figure 3">

**Teaching moment:** Should we count multiple occurrences of the same word within one document? Excellent observation. This is configurable in *Vandolie*. Results vary depending on document length and quantity - sometimes improving analysis, sometimes not.

#### Step 4: Filter Infrequent Words

Remove words that appear too rarely to be meaningful. Language follows Zipf's law - most words are rare while few words are extremely common. We focus on words that create connections between documents by appearing in multiple texts.

Set a frequency threshold (3 for this activity) and remove words appearing in fewer than that many documents: cross out words with counts of 1 or 2.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-4.png" alt="Bingo figure 4">

**Teaching moment:** How do we determine the optimal threshold? Experimentation is necessary. We want networks that are neither too large nor too small. *Vandolie* allows threshold adjustment based on your specific dataset.

#### Step 5: Create Co-occurrence Matrix

Prepare to count word pairs by creating a matrix (a table) where rows and columns represent remaining words. Cells will indicate whether word pairs appear together in documents.

Draw or display the matrix as shown in the teacher guide.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-5.png" alt="Bingo figure 5">

**Note:** Gray cells can be ignored while white cells require attention. The matrix is symmetrical - each word pair appears twice (upper-right and lower-left halves). We use only one half to avoid double-counting. The diagonal is omitted because words naturally co-occur with themselves.

#### Step 6: Count Word Pairs

This is the most analytically valuable step, extracting meaningful patterns from the document collection.

For each white cell in the matrix, call out the corresponding word pair (row and column words). Students check whether their cards contain both words simultaneously and raise their hands if so.

Record whether at least one document contains each pair - exact counts aren't necessary for this activity.

Verify your results match the guide. **If time is limited, demonstrate the principle, then proceed to results.**

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-6.png" alt="Bingo figure 6">

**Teaching moment:** Should we count how many documents contain each pair? This is certainly possible and often valuable. Advanced methods like "pointwise mutual information" (available in *Vandolie*) can improve results by weighing co-occurrences more sophisticatedly.

#### Step 7: Visualize as Network

Transform the matrix into a network visualization where words become nodes and co-occurrences become connecting lines. Each marked cell creates a line between the corresponding row and column words.

Draw this network in front of students so they understand its construction. Place words first, then draw connections by reading the matrix. **Position words as shown in the guide** to minimize line crossings.

<img class="border vdl-pic pic-w-500" src="/vandolie/img/screenshots/en/bingo-7.png" alt="Bingo figure 7">

### Network Interpretation

Conclude by discussing patterns students can identify in the network.

The expected pattern shows two distinct clusters. The left side contains words like "meat," "culture," "eat," "tradition," and "love", representing meat-eating perspectives. The right side includes "animals," "killing," "live," and "welfare", representing vegetarian perspectives. These clusters connect primarily through the word "meat." **Most documents represent only one perspective, creating this separation.** "Killing" doesn't co-occur with "culture," "welfare" doesn't appear with "tradition," etc.

This demonstrates "distant reading" - analyzing many documents simultaneously to extract patterns impossible to see when reading individually.

**Interesting case study:** Ask students why "love" appears on the meat-eating side rather than the vegetarian side (where we might expect it to relate to loving animals). In this corpus, "love" primarily refers to loving meat. Have students with "love" cards read their sentences aloud to verify this. This illustrates that words don't always behave as expected, highlighting the importance of combining distant reading with close reading (traditional reading).

### Connection to *Vandolie*

*Vandolie*'s "co-word network" algorithm performs exactly the same process as the Bingo of Words. The various counting decisions discussed during the activity appear as configurable settings in the tool.

Students can verify identical results by using the same corpus (available in *Vandolie*'s examples) with matching settings.

<img class="border vdl-pic" src="/vandolie/img/screenshots/en/bingo-8.png" alt="Bingo figure 8">