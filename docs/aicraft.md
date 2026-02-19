---
slug: aicraft
title: Aicraft
description: Pure C machine-learning framework with zero dependencies.
---

# Aicraft

A complete machine-learning framework written in pure C. No dependencies, no runtime, no compromises.

Aicraft is designed for engineers who need full control over their ML pipeline — from training to inference — without the overhead of Python-based frameworks.

## What it does

- **Tensor engine** — N-dimensional tensors with broadcasting, slicing, reshaping, and in-place operations
- **Automatic differentiation** — Reverse-mode autograd with 22 differentiable operations and a full computational graph
- **Neural network layers** — Dense, Conv2D, BatchNorm, Dropout, and common activations (ReLU, Sigmoid, Tanh, Softmax, GELU, Swish)
- **Training loop** — SGD, Adam, and AdamW optimizers with MSE, Cross-Entropy, and Huber loss functions
- **SIMD acceleration** — AVX2/AVX-512 and ARM NEON intrinsics for vectorized math
- **Vulkan compute** — GPU acceleration via GLSL compute shaders (14 shader programs)
- **INT8 quantization** — Post-training quantization for edge deployment
- **Model serialization** — Save and load trained models in a custom binary format

## Numbers

| Metric | Value |
|--------|-------|
| Header files | 16 |
| Compute shaders | 14 |
| Test cases | 75 |
| Autograd operations | 22 |
| External dependencies | 0 |

## Architecture

Aicraft is header-only. You include what you need:

```c
#include "aicraft/tensor.h"    // Core tensor operations
#include "aicraft/autograd.h"  // Automatic differentiation
#include "aicraft/layers.h"    // Neural network layers
#include "aicraft/optim.h"     // Optimizers
```

The entire framework compiles with any C11-compliant compiler. No build system required for integration — just add the `include/` directory to your path.

## Quick example

```c
#include "aicraft/aicraft.h"

int main() {
    ac_init();

    // Create a simple network
    AcLayer *dense1 = ac_dense(784, 128, AC_RELU);
    AcLayer *dense2 = ac_dense(128, 10, AC_SOFTMAX);

    // Forward pass
    AcTensor *input  = ac_tensor_rand((int[]){1, 784}, 2);
    AcTensor *hidden = ac_layer_forward(dense1, input);
    AcTensor *output = ac_layer_forward(dense2, hidden);

    // Compute loss and backpropagate
    AcTensor *target = ac_tensor_zeros((int[]){1, 10}, 2);
    float loss = ac_cross_entropy(output, target);
    ac_backward(output);

    ac_cleanup();
    return 0;
}
```

## Links

- [Aicraft documentation](https://miaototi.github.io/Aicraft/)
- [GitHub repository](https://github.com/miaototi/Aicraft)
- [MIT License](https://github.com/miaototi/Aicraft/blob/main/LICENSE)
