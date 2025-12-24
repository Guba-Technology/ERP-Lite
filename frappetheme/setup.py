from setuptools import setup, find_packages

setup(
    name="erp_lite",            # The app name, used by Bench
    version="0.0.1",            # Your app version
    packages=find_packages(),    # Finds your erp_lite/ folder automatically
    include_package_data=True,   # Includes non-Python files (like hooks.py, public/)
    install_requires=[],         # Add dependencies if needed, e.g., ["frappe"]
)
