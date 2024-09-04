### 1. Introduction

这篇论文继承自google reasearch的few-shot-cot，针对其存在的泛化性问题进行讨论。[[2024-08-21|Chain-of-Thought Prompting Elicits Reasoning in Large Language Models]]所提出的方法在新的要解决的问题的难度高于所给出的示例时，效果很差，因而具有很大的局限性。

为了克服easy-to-hard的泛化性问题，作者提出了一个新的两阶段方法——**least-to-most prompting**，将复杂问题先分解成一系列难度更低的子问题，然后链式解决每一个子问题，原问题作为最后一个子问题存在。一个简单的方法示例如下：

// TODO
### 2. Least-to-most Prompting

Least-to-most prompting教给模型如何将复杂的问题分解为一系列更简单的问题，它包含两个阶段：

1. **Decomposition**：这个阶段的prompt由固定的示例组成，他们负责如何对问题进行分解，然后跟着要要解决的特定问题；
2. **Subproblem solving**：这个阶段的prompt包括三部分，1）用于解决当前子问题的固定示例，2）由先前回答的子问题和生成的解决方案所构成的列表，3）接下来要回答的问题。

所以在这个两阶段多步骤的框架中，每一个步骤仍然可以应用cot或者self-consistency来提高对应子问题的解决效果。

> self-consistency，模型对于一个问题执行多条不同的思维链，然后对生成的可能不同的答案进行投票，类似于MOE的思路。

### 3. Experiment

作者主要将其与few-shot-cot进行比较，实验任务涉及符号操作、组合泛化以及数学推理三个方面。

#### 3.1 Symbolic Manipulation

在这一部分，作者再次选用了尾字母拼接的任务（“thinking, machine” outputs “ge”），一般情况下CoT在该任务上表现非常好，但是当新问题的单词个数远超过示例长度时，效果又会变得非常差。而least-to-most prompting在长度上的泛化性要优于CoT。

Least-to-most prompt设计如下：

// TODO

Chain-of-thought prompt设计如下：

// TODO

对于standard few-shot prompt，只需要移除chain-of-thought prompt的思维链部分即可。

最终实验结果如下图所示：

// TODO

standard prompting在所有长度上成功率均为0。Chain-of-Thought和Least-to-Most都具有非常好的效果，但是随着长度的增加，chain-of-thought的效果下降的更快，在长问题上的表现更差。

#### 3.2 Compositional Generation

作者在这个任务上使用了SCAN数据集，它将自然语言指令映射成动作序列，具体示例如下：

// TODO

Least-to-most prompt设计如下：

// TODO
// TODO

chain-of-thought使用和least-to-most相同的指令映射，但是不适用指令分解。

实验结果如下：

// TODO

#### 3.3 Math Reasoning

在这个测试中，处理math word problems in GSM8K and DROP。通过解决问题所需要的步骤来衡量任务的难易程度。

Least-to-most的prompt设计如下：

// TODO

注意，这里使用单阶段方式，将两个阶段的prompt融合到了一个阶段，然后测试两步的分解示例是否可以拓展到多步任务上。

Chain-of-thought的prompt设计如下：

// TODO

实验结果如下：

// TODO

// TODO

同样地，在数学问题上，使用相同示例的least-to-most对于更复杂的推理问题具有更好的泛化性。

### 4. 总结

Least-to-most具有更好的easy-to-hard泛化性，但是类似于few-shot-cot相较于zero-shot-cot，least-to-most在不同任务上的泛化性变得更差了，我们需要设计区分更加细致的更多prompt。（也是有得必有失，xs，或者可以搞一个zero-shot版本的least-to-most）。

