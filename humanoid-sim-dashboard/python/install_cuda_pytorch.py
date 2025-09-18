import subprocess
import sys

# Run pip install from requirements
subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
print("PyTorch CUDA install complete. Verify: python -c 'import torch; print(torch.cuda.is_available())'")